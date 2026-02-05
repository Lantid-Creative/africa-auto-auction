import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import {
  Car,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Package,
} from 'lucide-react';

const mockListings = [
  {
    id: '1',
    title: '2023 Mercedes-Benz G63 AMG',
    user: 'John Doe',
    userEmail: 'john@example.com',
    status: 'approved',
    location: 'Lagos, Nigeria',
    submittedAt: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
  },
  {
    id: '2',
    title: '2022 Range Rover Sport',
    user: 'Sarah M.',
    userEmail: 'sarah@example.com',
    status: 'pending',
    location: 'Johannesburg, South Africa',
    submittedAt: '2024-02-01',
    image: 'https://images.unsplash.com/photo-1606664666892-95c3e7ad0a3c?w=400',
  },
  {
    id: '3',
    title: '2021 BMW X5',
    user: 'Michael K.',
    userEmail: 'michael@example.com',
    status: 'pending',
    location: 'Accra, Ghana',
    submittedAt: '2024-02-03',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
  },
  {
    id: '4',
    title: '2023 Toyota Hilux',
    user: 'Amara O.',
    userEmail: 'amara@example.com',
    status: 'rejected',
    location: 'Nairobi, Kenya',
    submittedAt: '2024-01-28',
    image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=400',
  },
  {
    id: '5',
    title: '2022 Porsche Cayenne',
    user: 'David L.',
    userEmail: 'david@example.com',
    status: 'sold',
    location: 'Cairo, Egypt',
    submittedAt: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400',
  },
];

const AllListings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredListings = mockListings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || listing.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="status-approved gap-1">
            <CheckCircle2 className="w-3 h-3" /> Approved
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="status-pending gap-1">
            <Clock className="w-3 h-3" /> Pending
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="status-rejected gap-1">
            <XCircle className="w-3 h-3" /> Rejected
          </Badge>
        );
      case 'sold':
        return (
          <Badge className="bg-muted text-muted-foreground gap-1">
            <Package className="w-3 h-3" /> Sold
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold mb-1">All Listings</h1>
        <p className="text-muted-foreground">
          View and manage all vehicle listings across the platform
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by title, seller name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredListings.length > 0 ? (
                filteredListings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell>
                      <img
                        src={listing.image}
                        alt=""
                        className="w-14 h-10 rounded object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{listing.title}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{listing.user}</p>
                        <p className="text-xs text-muted-foreground">
                          {listing.userEmail}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {listing.location}
                    </TableCell>
                    <TableCell>{getStatusBadge(listing.status)}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {listing.submittedAt}
                    </TableCell>
                    <TableCell className="text-right">
                      {listing.status === 'pending' ? (
                        <Link to={`/admin/review/${listing.id}`}>
                          <Button size="sm" className="btn-premium gap-1">
                            <Eye className="w-4 h-4" />
                            Review
                          </Button>
                        </Link>
                      ) : (
                        <Link to={`/admin/review/${listing.id}`}>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center text-muted-foreground"
                  >
                    <Car className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    No listings match your filters
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

export default AllListings;
