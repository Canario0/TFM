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

import com.example.comparathor.adapters.ComparisonProductAdapter;
import com.example.comparathor.adapters.ComparisonProductBasicInfoAdapter;
import com.example.comparathor.entities.Comparison;
import com.example.comparathor.utils.IntentConstants;
import com.example.comparathor.viewModel.ComparisonViewModel;
import com.google.android.material.appbar.MaterialToolbar;

import java.util.Arrays;

public class ComparisonActivity extends AppCompatActivity {

    private ComparisonViewModel viewModel = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_comparison);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        MaterialToolbar toolbar = this.findViewById(R.id.topAppBar);
        toolbar.setNavigationOnClickListener(
                v -> {
                    getOnBackPressedDispatcher().onBackPressed();
                }
        );

        ComparisonProductAdapter adapter = new ComparisonProductAdapter();
        RecyclerView recyclerView = findViewById(R.id.comparison_products_recyclerview);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.scrollToPosition(0);
        recyclerView.setAdapter(adapter);

        ComparisonProductBasicInfoAdapter infoAdapter = new ComparisonProductBasicInfoAdapter(new String[]{"Precio", "Fabricante", "Marca", "Modelo"});
        RecyclerView recyclerInfoView = findViewById(R.id.comparison_products_info_recyclerview);
        recyclerInfoView.setLayoutManager(new LinearLayoutManager(this));
        recyclerInfoView.scrollToPosition(0);
        recyclerInfoView.setAdapter(infoAdapter);


        Intent intent = getIntent();
        String[] ids = intent.getStringArrayExtra(IntentConstants.PRODUCT_IDS);
        Log.i(this.getLocalClassName(), "Products: " + Arrays.toString(ids));
        this.viewModel = new ViewModelProvider(this).get(ComparisonViewModel.class);
        this.viewModel.createComparison(ids);
        this.viewModel.getComparison().observe(this, new Observer<Comparison>() {
            @Override
            public void onChanged(Comparison comparison) {
                Log.i(this.getClass().getName(), comparison.toString());
                adapter.setProducts(comparison.getProducts());
                infoAdapter.setProducts(comparison.getProducts());
            }
        });

    }
}