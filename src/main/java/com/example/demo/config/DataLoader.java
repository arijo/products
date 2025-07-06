package com.example.demo.config;

import java.math.BigDecimal;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;

@Component
public class DataLoader implements CommandLineRunner {
    
    private final ProductRepository productRepository;

    public DataLoader(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            loadSampleData();
        }
    }

    private void loadSampleData() {
        productRepository.save(new Product(
            "MacBook Pro 16\"", 
            "Powerful laptop with M3 Pro chip, 16GB RAM, and 512GB SSD. Perfect for professional work and creative projects with stunning Retina display.",
            new BigDecimal("2499.99"), 
            "Electronics"
        ));

        productRepository.save(new Product(
            "Wireless Bluetooth Headphones", 
            "Premium noise-cancelling headphones with 30-hour battery life. Crystal clear audio quality and comfortable over-ear design for all-day use.",
            new BigDecimal("199.99"), 
            "Electronics"
        ));

        productRepository.save(new Product(
            "Cotton Casual T-Shirt", 
            "100% organic cotton t-shirt with a relaxed fit. Available in multiple colors and sizes. Soft, breathable fabric perfect for everyday wear.",
            new BigDecimal("29.99"), 
            "Clothing"
        ));

        productRepository.save(new Product(
            "Leather Messenger Bag", 
            "Handcrafted genuine leather messenger bag with multiple compartments. Durable construction and timeless design suitable for work or travel.",
            new BigDecimal("149.99"), 
            "Clothing"
        ));

        productRepository.save(new Product(
            "JavaScript: The Definitive Guide", 
            "Comprehensive guide to modern JavaScript programming. Covers ES6+ features, best practices, and advanced concepts. Essential for web developers.",
            new BigDecimal("59.99"), 
            "Books"
        ));

        productRepository.save(new Product(
            "Design Patterns Book", 
            "Classic software engineering book covering fundamental design patterns. Learn to write better, more maintainable code with proven solutions.",
            new BigDecimal("49.99"), 
            "Books"
        ));

        productRepository.save(new Product(
            "Smart Coffee Maker", 
            "WiFi-enabled coffee maker with app control and scheduling. Programmable brew strength and temperature settings for the perfect cup every time.",
            new BigDecimal("299.99"), 
            "Home"
        ));

        productRepository.save(new Product(
            "Ergonomic Office Chair", 
            "Adjustable lumbar support and breathable mesh design. Perfect for long work sessions with multiple adjustment options and premium materials.",
            new BigDecimal("399.99"), 
            "Home"
        ));

        productRepository.save(new Product(
            "Yoga Mat Premium", 
            "Non-slip exercise mat with 6mm thickness for superior comfort and stability. Eco-friendly materials and easy-to-clean surface.",
            new BigDecimal("79.99"), 
            "Sports"
        ));

        productRepository.save(new Product(
            "Running Shoes", 
            "Lightweight athletic shoes with advanced cushioning technology. Breathable mesh upper and durable rubber outsole for optimal performance.",
            new BigDecimal("129.99"), 
            "Sports"
        ));
    }
}