package com.example.comparathor;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.example.comparathor.adapters.ProductSummaryAdapter;
import com.example.comparathor.entities.ProductSummary;
import com.example.comparathor.utils.IntentConstants;
import com.example.comparathor.viewModel.ProductSummaryViewModel;
import com.google.android.material.appbar.MaterialToolbar;

import java.util.List;
import java.util.Objects;

public class ProductsActivity extends AppCompatActivity {

    private ProductSummaryViewModel viewModel = null;
    private SwipeRefreshLayout swipeRefresh = null;

    private ProductSummaryViewModel.Callback refreshCallBack = null;
    private String category = null;

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

        ProductSummaryAdapter adapter = new ProductSummaryAdapter(this::onProductClick);
        RecyclerView.LayoutManager layoutManager =
                new LinearLayoutManager(this);
        RecyclerView recyclerView = findViewById(R.id.products_recyclerview);
        recyclerView.setLayoutManager(layoutManager);
        recyclerView.scrollToPosition(0);
        recyclerView.setAdapter(adapter);

        MaterialToolbar toolbar = this.findViewById(R.id.topAppBar);
        toolbar.setNavigationOnClickListener(
                v -> {
                    getOnBackPressedDispatcher().onBackPressed();
                }
        );

        Intent intent = getIntent();
        this.category = Objects.requireNonNull(intent.getStringExtra(IntentConstants.CATEGORY_NAME));

        this.swipeRefresh = this.findViewById(R.id.swipeRefresh);
        this.swipeRefresh.setOnRefreshListener(
                this::handleReload
        );
        this.swipeRefresh.setRefreshing(true);
        this.refreshCallBack = new ProductSummaryViewModel.Callback() {
            @Override
            public void onComplete(boolean success) {
                swipeRefresh.setRefreshing(!success);
            }
        };

        this.viewModel = new ViewModelProvider(this).get(ProductSummaryViewModel.class);
        this.viewModel.loadProducts(this.category, this.refreshCallBack);
        this.viewModel.getProducts().observe(this, new Observer<List<ProductSummary>>() {
            @Override
            public void onChanged(List<ProductSummary> products) {
                Log.i(this.getClass().getName(), products.toString());
                adapter.setProducts(products);
            }
        });
    }

    protected void handleReload() {
        this.viewModel.loadProducts(this.category, this.refreshCallBack);
    }

    public void onProductClick(ProductSummary product) {
        Log.i(this.getLocalClassName(), "Item: " + product);
        Intent intent = new Intent(this, ProductsActivity.class);
        intent.putExtra(IntentConstants.CATEGORY_ID, product.getId());
        intent.putExtra(IntentConstants.CATEGORY_NAME, product.getName());
        startActivity(intent);
    }
}