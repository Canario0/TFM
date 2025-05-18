package com.example.comparathor.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.comparathor.entities.CategoryPreview;
import com.example.comparathor.R;

import java.util.ArrayList;
import java.util.List;

public class CategoryPreviewAdapter extends RecyclerView.Adapter<CategoryPreviewAdapter.ViewHolder> {

    private List<CategoryPreview> categories = new ArrayList<>();
    private CategoryListener listener;

    public CategoryPreviewAdapter(CategoryListener listener) {
        this.listener = listener;
    }

    public void setCategories(List<CategoryPreview> categories) {
        this.categories = categories;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.category_preview_row, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        CategoryPreview category = this.categories.get(position);
        holder.bind(category, this.listener);
    }

    @Override
    public int getItemCount() {
        return categories.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {

        private final ImageView iconView;
        private final TextView nameTextView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            this.iconView = (ImageView) itemView.findViewById(R.id.category_icon);
            this.nameTextView = (TextView) itemView.findViewById(R.id.category_name);
        }

        public void bind(CategoryPreview category, CategoryListener listener) {
            this.iconView.setImageResource(category.getResourceIcon());
            this.nameTextView.setText(category.getName());
            this.itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    listener.onClick(category);
                }
            });
        }

    }

    public interface CategoryListener {
        void onClick(CategoryPreview category);
    }

}
