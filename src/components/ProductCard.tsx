import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import BuyDialog from "./BuyDialog";

export default function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="glass-card rounded-2xl overflow-hidden hover:border-white/20 transition group flex flex-col">
        <div className="aspect-[16/10] bg-secondary/40 overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <ShoppingBag className="w-10 h-10 opacity-40" />
            </div>
          )}
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3 flex-1">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="text-sm">
              {product.paypalPriceUsd != null && (
                <div className="font-semibold text-base">
                  ${product.paypalPriceUsd.toFixed(2)}{" "}
                  <span className="text-xs text-muted-foreground font-normal">
                    USD
                  </span>
                </div>
              )}
              {product.robuxPrice != null && (
                <div className="font-semibold text-base">
                  R$ {product.robuxPrice.toLocaleString()}{" "}
                  <span className="text-xs text-muted-foreground font-normal">
                    Robux
                  </span>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
            >
              Buy
            </button>
          </div>
        </div>
      </div>

      <BuyDialog
        product={product}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
