package com.sellphones.service.file;

import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.*;

@Service
public class FileStorageServiceImpl implements FileStorageService{

    private final Path root = Paths.get("uploads");

    @Override
    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }


    @Override
    public void store(MultipartFile file, String fileName, String folderName) {
        if(file.isEmpty()){
            throw new AppException(ErrorCode.EMPTY_FILE);
        }

        Path destinationFolder = root.resolve(Paths.get(folderName)).normalize().toAbsolutePath();
        Path destinationFile = destinationFolder.resolve(Paths.get(fileName)).normalize().toAbsolutePath();

        if (!destinationFile.startsWith(root.toAbsolutePath())) {
            throw new AppException(ErrorCode.CANNOT_STORE_FILE_OUTSIDE_CURRENT_DIRECTORY);
        }

        try (InputStream inputStream = file.getInputStream()) {
            Files.createDirectories(destinationFolder);
            Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public Resource load(String fileName, String folderName) {
        Path folder = root.resolve(Paths.get(folderName)).normalize().toAbsolutePath();
        Path file = folder.resolve(Paths.get(fileName)).normalize().toAbsolutePath();

        if (!file.startsWith(root.toAbsolutePath())) {
            throw new AppException(ErrorCode.CANNOT_READ_FILE_OUTSIDE_CURRENT_DIRECTORY);
        }

        try {
            Resource resource = new UrlResource(file.toUri());
            if(resource.exists() || resource.isReadable()){
                return resource;
            }else{
                throw new AppException(ErrorCode.CANNOT_READ_FILE);
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void delete(String fileName, String folderName) {
        Path folder = root.resolve(Paths.get(folderName)).normalize().toAbsolutePath();
        Path file = folder.resolve(Paths.get(fileName)).normalize().toAbsolutePath();
        try {
            Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
