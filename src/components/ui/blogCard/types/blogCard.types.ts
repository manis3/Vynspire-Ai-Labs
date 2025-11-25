export interface BlogCardProps {
  id: string | number;
  title: string;
  content: string;
  tags?: string[];
  onEdit: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  isLoading?: boolean;
}
