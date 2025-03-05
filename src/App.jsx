import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <AuthContextProvider>
      <WishlistContextProvider>
        <CartContextProvider>
          <DecodedContextProvider>
            <QueryClientProvider client={new QueryClient()}>
              <Router>
                <Routes>
                  {token ? (
                    <>
                      <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="cart" element={<Guard><Cart /></Guard>} />
                        <Route path="allorders" element={<Guard><AllOrders /></Guard>} />
                        <Route path="payment" element={<Guard><PaymentMethond /></Guard>} />
                        <Route path="products" element={<Guard><Products /></Guard>} />
                        <Route path="orders" element={<Guard><AllOrders /></Guard>} />
                        <Route path="order-details/:id" element={<Guard><UserOrders /></Guard>} />
                        <Route path="categories" element={<Guard><Categories /></Guard>} />
                        <Route path="wishlist" element={<Guard><Wishlist /></Guard>} />
                        <Route path="brandsdetails/:id" element={<Guard><BrandsDetails /></Guard>} />
                        <Route path="brands" element={<Guard><Brands /></Guard>} />
                        <Route path="details/:id" element={<Guard><ProductDetails /></Guard>} />
                      </Route>
                      <Route path="*" element={<Error />} />
                    </>
                  ) : (
                    <>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="*" element={<Navigate to="/login" replace />} />
                    </>
                  )}
                </Routes>
                <Toaster />
              </Router>
            </QueryClientProvider>
          </DecodedContextProvider>
        </CartContextProvider>
      </WishlistContextProvider>
    </AuthContextProvider>
  );
};

export default App;
