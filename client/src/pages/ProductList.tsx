import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Package, DollarSign, Plus, Search, Grid, List, Eye } from 'lucide-react';
import { fetchProducts, deleteProduct } from '../store/slices/productsSlice';
import type { RootState, AppDispatch } from '../store';
import type { Product } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';

function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, loading, error } = useSelector((state: RootState) => state.products);
  const { role } = useSelector((state: RootState) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    const colors = {
      electronics: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      clothing: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      books: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      home: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      sports: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    return colors[category.toLowerCase() as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 flex-1 max-w-md" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-8 w-16" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 flex-1" />
                  <Skeleton className="h-8 flex-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-destructive text-lg font-semibold mb-2">Error</div>
          <div className="text-muted-foreground">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Product Catalog
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Discover and manage our premium collection
            </p>
          </div>
          {role === 'ADMIN' && (
            <Button asChild size="lg" className="shadow-lg">
              <Link to="/products/new" className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Add Product</span>
              </Link>
            </Button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex rounded-lg border p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8 p-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {filteredProducts.length !== products.length && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <span>Showing {filteredProducts.length} of {products.length} products</span>
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchTerm('')}
                className="h-6 px-2 text-xs"
              >
                Clear search
              </Button>
            )}
          </div>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <Card className="w-full border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-4 mb-4">
              {searchTerm ? (
                <Search className="h-8 w-8 text-muted-foreground" />
              ) : (
                <Package className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <CardTitle className="text-2xl mb-2">
              {searchTerm ? 'No products found' : 'No products yet'}
            </CardTitle>
            <CardDescription className="text-center mb-6 max-w-md">
              {searchTerm 
                ? `No products match "${searchTerm}". Try adjusting your search terms.`
                : 'Get started by adding your first product to the catalog.'
              }
            </CardDescription>
            {searchTerm ? (
              <Button onClick={() => setSearchTerm('')} variant="outline">
                Clear search
              </Button>
            ) : role === 'ADMIN' && (
              <Button asChild size="lg">
                <Link to="/products/new" className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Add First Product</span>
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "space-y-4"
        }>
          {filteredProducts.map((product: Product) => (
            viewMode === 'grid' ? (
              <Card key={product.id} className="group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-b from-card to-card/50 backdrop-blur">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge 
                      className={`${getCategoryColor(product.category)} border-0 text-xs font-medium`}
                    >
                      {product.category}
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary flex items-center">
                        <DollarSign className="h-5 w-5" />
                        {product.price}
                      </div>
                      <div className="text-xs text-muted-foreground">per unit</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical' as const,
                    textOverflow: 'ellipsis'
                  }}>
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Separator className="mb-4" />
                  <div className="flex gap-2">
                    {role === 'ADMIN' ? (
                      <>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="flex-1 hover:bg-primary hover:text-primary-foreground"
                        >
                          <Link to={`/products/${product.id}/edit`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </Button>
                        <Button
                          onClick={() => handleDelete(product.id)}
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button variant="default" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                          {product.name}
                        </CardTitle>
                        <Badge className={`${getCategoryColor(product.category)} border-0`}>
                          {product.category}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm mb-3 overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical' as const,
                        textOverflow: 'ellipsis'
                      }}>
                        {product.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-4 ml-6">
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary flex items-center">
                          <DollarSign className="h-6 w-6" />
                          {product.price}
                        </div>
                        <div className="text-xs text-muted-foreground">per unit</div>
                      </div>
                      <div className="flex gap-2">
                        {role === 'ADMIN' ? (
                          <>
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                            >
                              <Link to={`/products/${product.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </Button>
                            <Button
                              onClick={() => handleDelete(product.id)}
                              variant="outline"
                              size="sm"
                              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <Button variant="default" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;