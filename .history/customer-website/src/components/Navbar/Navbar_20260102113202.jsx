{/* ---------- CART SLIDEOVER ---------- */}
<AnimatePresence>
  {cartOpen && (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={() => setCartOpen(false)}
        className="fixed inset-0 bg-black z-[9998]"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.35 }}
        className="fixed top-0 right-0 h-screen w-full max-w-md bg-[var(--bg-card)] shadow-2xl z-[9999] flex flex-col"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold text-[var(--text-main)]">Your Cart ({cartItems.length})</h2>
          <button aria-label="Close Cart" onClick={() => setCartOpen(false)}>
            <X size={22} className="text-[var(--primary)]" />
          </button>
        </div>

        {/* ITEMS (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {cartItems.length === 0 && (
            <p className="text-sm text-[var(--text-muted)]">Your cart is empty.</p>
          )}
          {cartItems.map(item => (
            <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
              <img src={item.img} alt={item.title} className="w-20 h-20 rounded-xl bg-[var(--bg-soft)] object-contain" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-[var(--text-main)]">{item.title}</h4>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">Size: {item.size}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-semibold text-[var(--text-main)]">₹ {item.price}</span>
                  <div className="flex items-center border rounded-full overflow-hidden">
                    <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 hover:bg-[var(--primary)] hover:text-white transition">−</button>
                    <span className="px-3 text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 hover:bg-[var(--primary)] hover:text-white transition">+</button>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-xs text-red-500 mt-2 hover:underline">Remove</button>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="border-t px-5 py-2 space-y-3">
          <div className="flex justify-between text-sm font-semibold text-[var(--text-main)]">
            <span>Subtotal</span>
            <span>₹ {cartSubtotal}</span>
          </div>

          <div className="bg-[var(--bg-soft)] rounded-xl p-2 space-y-1">
            <div className="flex items-center gap-2 text-[var(--text-main)] font-semibold"><Truck size={18} className="text-[var(--primary)]" />Delivery Information</div>
            <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><Clock size={16} className="mt-0.5 text-[var(--secondary)]" /><span>Estimated delivery in <b>3–5 business days</b></span></div>
            <div className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><ShieldCheck size={16} className="mt-0.5 text-[var(--secondary)]" /><span>Free delivery on orders above <b>₹499</b></span></div>
          </div>

          <button onClick={() => { setCartOpen(false); navigate("/checkout"); }} className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">Proceed to Checkout</button>
          <button onClick={() => { setCartOpen(false); navigate("/cart"); }} className="w-full border border-[var(--primary)] text-[var(--primary)] py-2 rounded-xl text-sm hover:bg-[var(--primary)] hover:text-white transition">View Full Cart</button>

          <p className="flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]"><ShieldCheck size={14} className="text-[var(--primary)]" />Secure checkout · Easy returns · Trusted quality</p>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
