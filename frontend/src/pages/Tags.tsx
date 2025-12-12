import { useState, useEffect } from 'react';
import { Tag as TagIcon, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Tag as TagBadge } from '../components/ui/Tag';
import { Spinner } from '../components/ui/Spinner';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/Toast';
import { api } from '../lib/httpClient';
import { getErrorMessage } from '../lib/utils';
import type { Tag } from '../lib/types';
import { useNavigate } from 'react-router-dom';

export function Tags() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [newTagName, setNewTagName] = useState('');
    const { user } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        fetchTags();
    }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchTags = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const data = await api.get<Tag[]>('/tags');
            setTags(data);
        } catch (error) {
            showToast('error', getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTag = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newTagName.trim()) {
            showToast('error', 'Please enter a tag name');
            return;
        }

        try {
            setCreating(true);
            const data = await api.post<Tag>('/tags', {
                name: newTagName.trim(),
            });

            setTags([...tags, data]);
            setNewTagName('');
            showToast('success', 'Tag created successfully!');
        } catch (error) {
            showToast('error', getErrorMessage(error));
        } finally {
            setCreating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/dashboard')}
                    className="mb-4"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Dashboard
                </Button>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
                            <TagIcon size={32} />
                            Tags
                        </h1>
                        <p className="text-text-muted mt-2">
                            Manage your tags ({tags.length} total)
                        </p>
                    </div>
                </div>
            </div>

            {/* Create Tag Form */}
            <Card className="mb-8 p-6">
                <h2 className="text-xl font-semibold text-text-primary mb-4">
                    Create New Tag
                </h2>
                <form onSubmit={handleCreateTag} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            type="text"
                            placeholder="Tag name"
                            value={newTagName}
                            onChange={(e) => setNewTagName(e.target.value)}
                            disabled={creating}
                            className="w-full"
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={creating || !newTagName.trim()}
                        className="whitespace-nowrap"
                    >
                        <Plus size={20} className="mr-2" />
                        {creating ? 'Creating...' : 'Create Tag'}
                    </Button>
                </form>
            </Card>

            {/* Tags List */}
            {tags.length === 0 ? (
                <Card className="p-12 text-center">
                    <TagIcon size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                        No tags yet
                    </h3>
                    <p className="text-text-muted mb-4">
                        Create your first tag to start organizing your items
                    </p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {tags.map((tag) => (
                        <Card
                            key={tag.id}
                            className="p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <TagBadge
                                    label={tag.name}
                                    color={tag.color || undefined}
                                />
                                <TagIcon size={16} className="text-gray-400" />
                            </div>
                            <div className="mt-3 text-xs text-gray-500">
                                Created {new Date(tag.created_at).toLocaleDateString()}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
