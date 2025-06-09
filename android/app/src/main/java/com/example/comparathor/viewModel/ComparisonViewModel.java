package com.example.comparathor.viewModel;

import android.app.Application;
import android.util.Log;

import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.comparathor.api.ApiFacade;
import com.example.comparathor.entities.Comparison;
import com.example.comparathor.entities.Product;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import kotlin.NotImplementedError;


public class ComparisonViewModel extends AndroidViewModel {
    private final ExecutorService executorService = Executors.newSingleThreadExecutor();
    private final ApiFacade api;
    private final MutableLiveData<Comparison> comparison = new MutableLiveData<>();

    public ComparisonViewModel(Application application) {
        super(application);
        this.api = ApiFacade.getInstance();
    }

    public LiveData<Comparison> getComparison() {
        return comparison;
    }

    public interface Callback {
        void onComplete(boolean success);
    }

    public void loadComparisonById(String id, Callback callback) {
        throw new NotImplementedError("Comparison loading by id is under construction");
    }

    public void createComparison(Callback callback, String... productIds) {
        executorService.execute(
                new Runnable() {
                    @Override
                    public void run() {
                        List<Product> remoteProducts = new ArrayList<>();
                        for (String productId : productIds) {
                            Product product = api.getProductById(productId);
                            if (product != null) {
                                remoteProducts.add(product);
                            }
                        }
                        remoteProducts.sort((p1, p2) -> p1.getName().compareTo(p2.getName()));
                        comparison.postValue(new Comparison(null, null, null, null, remoteProducts));
                        Log.i(ComparisonViewModel.class.getName(), "Response: " + remoteProducts);
                        if (callback != null) {
                            callback.onComplete(true);
                        }
                    }
                }
        );
    }
}
