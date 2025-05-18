package com.example.comparathor;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.activity.EdgeToEdge;
import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.example.comparathor.adapters.CategoryPreviewAdapter;
import com.example.comparathor.entities.CategoryPreview;
import com.example.comparathor.utils.IntentConstants;
import com.example.comparathor.viewModel.CategoriesPreviewViewModel;
import com.google.android.material.appbar.MaterialToolbar;

import java.util.List;

public class ProductsActivity extends AppCompatActivity {

    private CategoriesPreviewViewModel viewModel = null;
    private SwipeRefreshLayout swipeRefresh = null;

    private CategoriesPreviewViewModel.Callback refreshCallBack = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_products);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        CategoryPreviewAdapter adapter = new CategoryPreviewAdapter(this::onCategoryClick);
        RecyclerView.LayoutManager layoutManager =
                new LinearLayoutManager(this);
        RecyclerView recyclerView = findViewById(R.id.categories_recyclerview);
        recyclerView.setLayoutManager(layoutManager);
        recyclerView.scrollToPosition(0);
        recyclerView.setAdapter(adapter);

        MaterialToolbar toolbar = this.findViewById(R.id.topAppBar);
        toolbar.setNavigationOnClickListener(
                v -> {
                    getOnBackPressedDispatcher().onBackPressed();
                }
        );

        this.swipeRefresh = this.findViewById(R.id.swipeRefresh);
        this.swipeRefresh.setOnRefreshListener(
                this::handleReload
        );
        this.swipeRefresh.setRefreshing(true);
        this.refreshCallBack = new CategoriesPreviewViewModel.Callback() {
            @Override
            public void onComplete(boolean success) {
                swipeRefresh.setRefreshing(!success);
            }
        };

        this.viewModel = new ViewModelProvider(this).get(CategoriesPreviewViewModel.class);
        this.viewModel.loadCategories(this.refreshCallBack);
        this.viewModel.getCategories().observe(this, new Observer<List<CategoryPreview>>() {
            @Override
            public void onChanged(List<CategoryPreview> categories) {
                if (categories != null) {
                    Log.i(this.getClass().getName(), categories.toString());
                    adapter.setCategories(categories);
                }
            }
        });
    }

    protected void handleReload() {
        this.viewModel.loadCategories(this.refreshCallBack);
    }

    public void onCategoryClick(CategoryPreview category) {
        Log.i(this.getLocalClassName(), "Item: " + category);
        Intent intent = new Intent(this, ProductsActivity.class);
        intent.putExtra(IntentConstants.CATEGORY_ID, category.getId());
        intent.putExtra(IntentConstants.CATEGORY_NAME, category.getName());
        startActivity(intent);
    }
}