import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, User, LogOut } from 'lucide-react';
import type { RootState } from '../store';
import { login, logout } from '../store/slices/authSlice';
import { Button } from './ui/button';

function Navbar() {
  const dispatch = useDispatch();
  const { username, role } = useSelector((state: RootState) => state.auth);

  const handleLogin = (username: string, role: 'USER' | 'ADMIN') => {
    dispatch(login({ username, role }));
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/products" className="flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6" />
          <span className="text-xl font-bold">Product Catalog</span>
        </Link>
        <div className="flex items-center space-x-4">
          {role === 'ADMIN' && (
            <Button asChild variant="outline" size="sm">
              <Link to="/products/new" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create Product</span>
              </Link>
            </Button>
          )}
          {username ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{username} ({role})</span>
              </div>
              <Button
                onClick={() => dispatch(logout())}
                variant="outline"
                size="sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => handleLogin('user', 'USER')}
                variant="outline"
                size="sm"
              >
                Login as User
              </Button>
              <Button
                onClick={() => handleLogin('admin', 'ADMIN')}
                size="sm"
              >
                Login as Admin
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;