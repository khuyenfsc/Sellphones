package com.sellphones.service.file;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileStorageService {
    void init();
    String generateFileName(MultipartFile file);
    String store(MultipartFile file, String folderName);
    void store(MultipartFile file, String fileName, String folderName);
    Resource load(String fileName, String folderName);
    void delete(String fileName, String folderName);

}
