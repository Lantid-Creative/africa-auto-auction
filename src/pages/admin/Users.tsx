import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Users as UsersIcon, User, Shield } from 'lucide-react';

const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    joinedAt: '2024-01-15',
    listingsCount: 3,
    bidsCount: 12,
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@afriauto.com',
    role: 'admin',
    joinedAt: '2023-11-01',
    listingsCount: 0,
    bidsCount: 0,
  },
  {
    id: '3',
    name: 'Sarah M.',
    email: 'sarah@example.com',
    role: 'user',
    joinedAt: '2024-02-01',
    listingsCount: 2,
    bidsCount: 8,
  },
  {
    id: '4',
    name: 'Michael K.',
    email: 'michael@example.com',
    role: 'user',
    joinedAt: '2024-01-28',
    listingsCount: 1,
    bidsCount: 15,
  },
  {
    id: '5',
    name: 'Amara O.',
    email: 'amara@example.com',
    role: 'user',
    joinedAt: '2024-01-20',
    listingsCount: 4,
    bidsCount: 5,
  },
];

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold mb-1">Users</h1>
        <p className="text-muted-foreground">
          Manage platform users and roles
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Listings</TableHead>
                <TableHead>Bids</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.role === 'admin' ? (
                        <Badge className="gap-1 bg-primary/20 text-primary">
                          <Shield className="w-3 h-3" /> Admin
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1">
                          <UsersIcon className="w-3 h-3" /> User
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {user.joinedAt}
                    </TableCell>
                    <TableCell>{user.listingsCount}</TableCell>
                    <TableCell>{user.bidsCount}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    <UsersIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    No users match your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Users;
