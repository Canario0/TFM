package com.example.comparathor.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.comparathor.R;
import com.example.comparathor.entities.Product;

import java.util.ArrayList;
import java.util.List;

public class ComparisonProductAdapter extends RecyclerView.Adapter<ComparisonProductAdapter.ViewHolder> {

    private List<Product> products = new ArrayList<>();

    public void setProducts(List<Product> products) {
        this.products = products;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.comparison_product_row, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Product product = this.products.get(position);
        holder.bind(product);
    }

    @Override
    public int getItemCount() {
        return products.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {

        private final ImageView iconView;
        private final TextView nameTextView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            this.iconView = (ImageView) itemView.findViewById(R.id.product_icon);
            this.nameTextView = (TextView) itemView.findViewById(R.id.product_name);
        }

        public void bind(Product product) {
            this.iconView.setImageResource(product.getResourceIcon());
            this.nameTextView.setText(product.getName());
        }

    }
}
