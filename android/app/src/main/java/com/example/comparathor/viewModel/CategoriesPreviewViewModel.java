package com.example.comparathor.viewModel;

import android.app.Application;
import android.util.Log;

import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.comparathor.api.ApiFacade;
import com.example.comparathor.entities.CategoryPreview;


import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class CategoriesPreviewViewModel extends AndroidViewModel {
    private final ExecutorService executorService = Executors.newSingleThreadExecutor();
    private final ApiFacade api;
    private final MutableLiveData<List<CategoryPreview>> categories = new MutableLiveData();

    public CategoriesPreviewViewModel(Application application) {
        super(application);
        this.api = ApiFacade.getInstance();
    }

    public LiveData<List<CategoryPreview>> getCategories() {
        return categories;
    }


    public interface Callback {
        void onComplete(boolean success);
    }

    public void loadCategories(Callback callback) {
        executorService.execute(
                new Runnable() {
                    @Override
                    public void run() {
                        List<CategoryPreview> remoteCategories = api.getAllCategories();
                        categories.postValue(remoteCategories);
                        Log.i(CategoriesPreviewViewModel.class.getName(), "Response: " + remoteCategories);
                        if (callback != null) {
                            callback.onComplete(true);
                        }
                    }
                }
        );
    }
}
