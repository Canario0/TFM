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

import com.example.comparathor.entities.Comparison;
import com.example.comparathor.entities.ProductSummary;
import com.example.comparathor.utils.IntentConstants;
import com.example.comparathor.viewModel.ComparisonViewModel;
import com.google.android.material.appbar.MaterialToolbar;

import java.util.Arrays;
import java.util.List;

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

        Intent intent = getIntent();
        String[] ids = intent.getStringArrayExtra(IntentConstants.PRODUCT_IDS);
        Log.i(this.getLocalClassName(), "Products: " + Arrays.toString(ids));
        this.viewModel = new ViewModelProvider(this).get(ComparisonViewModel.class);
        this.viewModel.createComparison(ids);
        this.viewModel.getComparison().observe(this, new Observer<Comparison>() {
            @Override
            public void onChanged(Comparison comparison) {
                Log.i(this.getClass().getName(), comparison.toString());
            }
        });
    }
}