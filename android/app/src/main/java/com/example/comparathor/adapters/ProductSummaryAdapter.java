package com.example.comparathor.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.comparathor.R;
import com.example.comparathor.entities.ProductSummary;

import java.util.ArrayList;
import java.util.List;

public class ProductSummaryAdapter extends RecyclerView.Adapter<ProductSummaryAdapter.ViewHolder> {

    private List<ProductSummary> products = new ArrayList<>();
    private ProductListener listener;

    public ProductSummaryAdapter(ProductListener listener) {
        this.listener = listener;
    }

    public void setProducts(List<ProductSummary> products) {
        this.products = products;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.product_summary_row, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        ProductSummary product = this.products.get(position);
        holder.bind(product, this.listener);
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

        public void bind(ProductSummary product, ProductListener listener) {
            this.iconView.setImageResource(product.getResourceIcon());
            this.nameTextView.setText(product.getName());
            this.itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    listener.onClick(product);
                }
            });
        }

    }

    public interface ProductListener {
        void onClick(ProductSummary product);
    }

}
