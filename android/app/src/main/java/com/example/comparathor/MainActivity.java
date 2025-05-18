package com.example.comparathor;

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

import com.example.comparathor.adapters.CategoryPreviewAdapter;
import com.example.comparathor.entities.CategoryPreview;
import com.example.comparathor.viewModel.CategoriesPreviewViewModel;

import java.util.List;

public class MainActivity extends AppCompatActivity {

    private CategoriesPreviewViewModel viewModel = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        CategoryPreviewAdapter adapter = new CategoryPreviewAdapter();
        RecyclerView.LayoutManager layoutManager =
                new LinearLayoutManager(this);
        RecyclerView recyclerView = findViewById(R.id.categories_recyclerview);
        recyclerView.setLayoutManager(layoutManager);
        recyclerView.scrollToPosition(0);
        recyclerView.setAdapter(adapter);

        this.viewModel = new ViewModelProvider(this).get(CategoriesPreviewViewModel.class);
        this.viewModel.loadCategories();
        this.viewModel.getCategories().observe(this, new Observer<List<CategoryPreview>>() {
            @Override
            public void onChanged(List<CategoryPreview> categories) {
                if (categories != null) {
                    Log.i(this.getClass().getName(), categories.toString());
                    adapter.setCategories(categories);
                    adapter.notifyDataSetChanged();
                }
            }
        });
    }
}