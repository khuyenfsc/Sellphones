package com.sellphones.service.file;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    void init();
    void store(MultipartFile file, String fileName, String folderName);
    Resource load(String fileName, String folderName);
    void delete(String fileName, String folderName);
}
