import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, User, LogOut, LogIn } from 'lucide-react';
import type { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { authService } from '../services/auth';
import { Button } from './ui/button';

function Navbar() {
  const dispatch = useDispatch();
  const { username, role } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      dispatch(logout());
    }
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
                onClick={handleLogout}
                variant="outline"
                size="sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link to="/signin" className="flex items-center space-x-2">
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;