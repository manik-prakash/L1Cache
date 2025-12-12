import { useState, useEffect } from 'react';
import { Search, Share2 } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ItemCard } from '../components/items/ItemCard';
import { Modal } from '../components/ui/Modal';
import { Spinner } from '../components/ui/Spinner';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/Toast';
import { api } from '../lib/httpClient';
import { getErrorMessage } from '../lib/utils';
import type { Item } from '../lib/types';

interface SharedProps {
    onNavigate: (view: string, itemId?: string) => void;
}

export function Shared({ onNavigate }: SharedProps) {
    const [items, setItems] = useState<Item[]>([]);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const { user } = useAuth();
    const { showToast } = useToast();

    useEffect(() => {
        fetchSharedItems();
    }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredItems(items);
            return;
        }
        const query = searchQuery.toLowerCase();
        const filtered = items.filter(
            (item) =>
                item.title.toLowerCase().includes(query) ||
                item.content.toLowerCase().includes(query) ||
                item.tags?.some((tag) => tag.name.toLowerCase().includes(query))
        );
        setFilteredItems(filtered);
    }, [searchQuery, items]);

    const fetchSharedItems = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const allItems = await api.get<Item[]>('/items');
            // Filter to only public items
            const publicItems = allItems.filter((item) => item.is_public);
            setItems(publicItems);
            setFilteredItems(publicItems);
        } catch (error: unknown) {
            showToast('error', getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStar = async (id: string) => {
        const item = items.find((i) => i.id === id);
        if (!item) return;

        try {
            const updatedItem = await api.patch<Item>(`/items/${id}/star`);
            setItems(items.map((i) => (i.id === id ? updatedItem : i)));
            showToast('success', updatedItem.is_starred ? 'Added to starred' : 'Removed from starred');
        } catch (error: unknown) {
            showToast('error', getErrorMessage(error));
        }
    };

    const handleDelete = async () => {
        if (!itemToDelete) return;

        try {
            await api.delete(`/items/${itemToDelete}`);
            setItems(items.filter((i) => i.id !== itemToDelete));
            setFilteredItems(filteredItems.filter((i) => i.id !== itemToDelete));
            showToast('success', 'Item deleted successfully');
        } catch (error: unknown) {
            showToast('error', getErrorMessage(error));
        }

        setDeleteModalOpen(false);
        setItemToDelete(null);
    };

    const handleShare = async (id: string) => {
        const item = items.find((i) => i.id === id);
        if (!item) return;

        // Item is already public (filtered), just need slug
        if (item.share_slug) {
            const url = `${window.location.origin}/shared/${item.share_slug}`;
            setShareUrl(url);
            setShareModalOpen(true);
        } else {
            // Public but no slug yet - fetch to trigger generation
            try {
                const refreshedItem = await api.get<Item>(`/items/${id}`);
                if (refreshedItem.share_slug) {
                    const url = `${window.location.origin}/shared/${refreshedItem.share_slug}`;
                    setShareUrl(url);
                    setShareModalOpen(true);
                    // Update state
                    setItems(items.map((i) => (i.id === id ? refreshedItem : i)));
                    setFilteredItems(filteredItems.map((i) => (i.id === id ? refreshedItem : i)));
                } else {
                    showToast('error', 'Failed to generate share link');
                }
            } catch (error) {
                console.error(error);
                showToast('error', 'Failed to get share link');
            }
        }
    };

    const copyShareUrl = () => {
        navigator.clipboard.writeText(shareUrl);
        showToast('success', 'Link copied to clipboard');
        setShareModalOpen(false);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
                            <Share2 size={32} />
                            Shared Items
                        </h1>
                        <p className="text-text-muted mt-1">
                            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} shared publicly
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                        type="text"
                        placeholder="Search shared items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClear={() => setSearchQuery('')}
                        className="pl-10"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Spinner size="lg" />
                </div>
            ) : filteredItems.length === 0 ? (
                <div className="text-center py-20">
                    <Share2 size={64} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                        {searchQuery ? 'No shared items match your search' : 'No shared items yet'}
                    </h3>
                    <p className="text-text-muted mb-6">
                        {searchQuery
                            ? 'Try a different search term'
                            : 'Create an item and enable public sharing to see it here'}
                    </p>
                    {!searchQuery && (
                        <Button onClick={() => onNavigate('new')}>Create & Share Item</Button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <ItemCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            content={item.content}
                            type={item.type}
                            sourceUrl={item.source_url}
                            isStarred={item.is_starred}
                            isPublic={item.is_public}
                            tags={item.tags}
                            createdAt={item.created_at}
                            onEdit={(id) => onNavigate('edit', id)}
                            onDelete={(id) => {
                                setItemToDelete(id);
                                setDeleteModalOpen(true);
                            }}
                            onToggleStar={handleToggleStar}
                            onShare={handleShare}
                            onClick={(id) => onNavigate('item', id)}
                        />
                    ))}
                </div>
            )}

            <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Delete Item"
                size="sm"
            >
                <div className="p-6">
                    <p className="text-text-muted mb-6">Are you sure you want to delete this shared item? This action cannot be undone.</p>
                    <div className="flex gap-3 justify-end">
                        <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={shareModalOpen}
                onClose={() => setShareModalOpen(false)}
                title="Share Item"
                size="sm"
            >
                <div className="p-6">
                    <p className="text-text-muted mb-4">Share this link with anyone:</p>
                    <Input value={shareUrl} readOnly className="mb-4" />
                    <div className="flex gap-3 justify-end">
                        <Button variant="secondary" onClick={() => setShareModalOpen(false)}>
                            Close
                        </Button>
                        <Button onClick={copyShareUrl}>Copy Link</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
