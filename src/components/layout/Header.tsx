import { Bell, Search, Menu } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuToggle?: () => void;
}

export default function Header({ title, subtitle, onMenuToggle }: HeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card px-4 md:px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuToggle}>
          <Menu className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9 h-9 bg-muted/50 border-none" />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </Button>
        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">AO</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
