package com.example.comparathor.viewModel;

import android.app.Application;
import android.util.Log;

import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.comparathor.api.ApiFacade;
import com.example.comparathor.entities.ProductSummary;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

public class ProductSummaryViewModel extends AndroidViewModel {
    private final ExecutorService executorService = Executors.newSingleThreadExecutor();
    private final ApiFacade api;
    private final MutableLiveData<List<ProductSummary>> products = new MutableLiveData<>();

    public ProductSummaryViewModel(Application application) {
        super(application);
        this.api = ApiFacade.getInstance();
    }

    public LiveData<List<ProductSummary>> getProducts() {
        return products;
    }


    public interface Callback {
        void onComplete(boolean success);
    }

    public void loadProducts(String category, Callback callback) {
        executorService.execute(
                new Runnable() {
                    @Override
                    public void run() {
                        List<ProductSummary> remoteProducts = api.getAllProducts();
                        remoteProducts = remoteProducts.stream().filter(product -> category.equals(product.getCategory())).collect(Collectors.toList());
                        products.postValue(remoteProducts);
                        Log.i(ProductSummaryViewModel.class.getName(), "Response: " + remoteProducts);
                        if (callback != null) {
                            callback.onComplete(true);
                        }
                    }
                }
        );
    }
}
