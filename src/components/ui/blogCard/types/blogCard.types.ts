export interface BlogCardProps {
  title: string;
  content: string;
  tags?: string[];
  onEdit?: () => void;
  onDelete?: () => void;
}
