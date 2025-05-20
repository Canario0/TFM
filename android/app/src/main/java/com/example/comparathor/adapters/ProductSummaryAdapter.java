package com.example.comparathor.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.RatingBar;
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

        private final RatingBar ratingBar;

        private final ImageButton selectImageButton;
        private final ImageButton unselectImageButton;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            this.iconView = (ImageView) itemView.findViewById(R.id.product_icon);
            this.nameTextView = (TextView) itemView.findViewById(R.id.product_name);
            this.ratingBar = (RatingBar) itemView.findViewById(R.id.ratingBar);
            this.selectImageButton = (ImageButton) itemView.findViewById(R.id.select_button);
            this.unselectImageButton = (ImageButton) itemView.findViewById(R.id.unselect_button);
        }

        public void bind(ProductSummary product, ProductListener listener) {
            this.iconView.setImageResource(product.getResourceIcon());
            this.nameTextView.setText(product.getName());
            this.ratingBar.setRating(product.getRating());
            this.selectImageButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    selectImageButton.setVisibility(View.GONE);
                    unselectImageButton.setVisibility(View.VISIBLE);
                    listener.onSelected(product);
                }
            });
            this.unselectImageButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    unselectImageButton.setVisibility(View.GONE);
                    selectImageButton.setVisibility(View.VISIBLE);
                    listener.onSelected(product);
                }
            });
        }

    }

    public interface ProductListener {

        void onSelected(ProductSummary product);

        void onUnselected(ProductSummary product);
    }

}
