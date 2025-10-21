package com.sellphones.utils;

import java.util.List;

public class ImageNameToImageUrlConverter {

    private final static String BASE_URL = "http://localhost:8080/uploads/";

    public static List<String> convertAll(List<String> imageNames, String folderName){
        return imageNames.stream().map(in -> BASE_URL + folderName + "/" + in).toList();
    }

    public static String convert(String imageName, String folderName){
        return BASE_URL + folderName + "/" + imageName;
    }

}
