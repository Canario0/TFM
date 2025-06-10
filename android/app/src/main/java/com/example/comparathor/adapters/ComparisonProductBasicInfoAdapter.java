package com.example.comparathor.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.comparathor.R;
import com.example.comparathor.entities.Icons;
import com.example.comparathor.entities.Product;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class ComparisonProductBasicInfoAdapter extends RecyclerView.Adapter<ComparisonProductBasicInfoAdapter.ViewHolder> {

    private List<Product> products = new ArrayList<>();
    private String[] metadata;

    public ComparisonProductBasicInfoAdapter(String[] metadata) {
        this.metadata = metadata;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.comparison_card, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.bind(metadata[position], this.products, holder.itemView.getContext());
    }

    @Override
    public int getItemCount() {
        return metadata.length;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {

        private final ImageView iconView;
        private final TextView titleView;
        private final LinearLayout linearLayout;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            this.iconView = (ImageView) itemView.findViewById(R.id.product_icon);
            this.titleView = (TextView) itemView.findViewById(R.id.name);
            this.linearLayout = (LinearLayout) itemView.findViewById(R.id.comparison_content);
        }

        public void bind(String metadata, List<Product> products, Context ctx) {
            this.iconView.setImageResource(metadata.equals("Precio") ? Icons.Price.getDrawableResource() : Icons.Other.getDrawableResource());
            this.titleView.setText(metadata);
            linearLayout.removeAllViews();
            for (Product product : products) {
                TextView tv = new TextView(ctx);
                switch (metadata) {
                    case "Fabricante":
                        tv.setText(product.getMaker());
                    case "Modelo":
                        tv.setText(product.getModel());
                    case "Marca":
                        tv.setText(product.getBrand());
                    case "Precio":
                    default:
                        tv.setText(product.getPrice() + "€");
                        break;
                }
                linearLayout.addView(tv);
            }
        }
    }
}
