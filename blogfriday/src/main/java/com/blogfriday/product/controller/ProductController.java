package com.blogfriday.product.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.blogfriday.product.dto.ProductAndImgDTO;
import com.blogfriday.product.dto.ProductDTO;
import com.blogfriday.product.dto.ProductimgDTO;
import com.blogfriday.product.service.ProductService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/api/product")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@Value("${spring.servlet.multipart.location}")
	private String filePath;
	
	
	
	public ProductController() {
	}
	
	@PostMapping("/save")
	public  ResponseEntity<String> saveProduct(@ModelAttribute ProductAndImgDTO productAndImgDTO){
		log.info("물품등록메소드: {}", productAndImgDTO);
	    ProductDTO productDTO = new ProductDTO();
	    ProductimgDTO productImgDTO = new ProductimgDTO();
	    MultipartFile file = productAndImgDTO.getFilename();
	    		
	    productDTO.setSeller_id(productAndImgDTO.getSeller_id());
	    productDTO.setCategory_code(productAndImgDTO.getCategory_code());
	    productDTO.setProduct_name(productAndImgDTO.getProduct_name());
	    productDTO.setProduct_price(productAndImgDTO.getProduct_price());
	    productDTO.setProduct_count(productAndImgDTO.getProduct_count());
		
	    productService.saveProcess(productDTO); // 할때 productdto에 프라이머리키를 집어넣는다
	    
	    log.info("물품등록확인: {}", productDTO.getProduct_code());
	    
	    if (file != null && !file.isEmpty()) {
			
			File filedownload = new File(filePath, productDTO.getProduct_code()+ "_" + "product_img0"+".png" );	
			
			
			
			//임시기억장치 걸 가져와서 로컬에 저장
			
			try {
				FileCopyUtils.copy(file.getInputStream(), new FileOutputStream(filedownload));
			} catch (IOException e) {
				e.printStackTrace();
			}
			productImgDTO.setProduct_img0(productDTO.getProduct_code()+ "_" + "product_img0"+".png" );
//			
		}
//	    
	    productImgDTO.setProduct_code(productDTO.getProduct_code());
	    log.info("물품이미지확인: {}", productImgDTO.getProduct_img0());
	    
	    
	    log.info("product_code확인: {}", productDTO);
		productService.saveImgProcess(productImgDTO);
		
		return ResponseEntity.ok(null);
	}
	


	@PutMapping("/update")
	public ResponseEntity<String> updateProduct(@RequestBody ProductDTO productDTO){
		
		
		
		log.info("물품수정확인: {}", productDTO);
		productService.updateProcess(productDTO);
		return ResponseEntity.ok(null);
	}
	
	@DeleteMapping("/delete/{product_code}")
	public ResponseEntity<Object> deleteProduct(@PathVariable("product_code") int product_code){
		log.info("물품삭제확인: {}", product_code);
		productService.deleteProcess(product_code);
		return ResponseEntity.ok(null);
	}
	
	
	@GetMapping("/content/{product_code}")
	public ResponseEntity<ProductDTO> productcontent(@PathVariable("product_code") int product_code) {
		ProductDTO Dto = productService.contentProcess(product_code);
		log.info("물품조회확인: {}", Dto);
		return ResponseEntity.ok(Dto);
	}
	
	@GetMapping("/content/img/{product_code}")
	public ResponseEntity<ProductimgDTO> productimgcontent(@PathVariable("product_code") int product_code) {
		ProductimgDTO Dto = productService.contentImgProcess(product_code);
		log.info("물품이미지조회확인: {}", Dto);
		return ResponseEntity.ok(Dto);
	}
	
	//물품 이름으로 리스트 가져오기
	@GetMapping("/list/{product_name}")
	public ResponseEntity<Map<String, Object>> searchlist(@PathVariable("product_name") String product_name) {
		Map<String, Object> map = new HashMap<>();
		log.info("들어온 제품명:{}", product_name);
		List<ProductDTO> productList = productService.searchlistProcess(product_name);
		
		List<Integer> productCodes = productList.stream()
                .map(ProductDTO::getProduct_code)
                .collect(Collectors.toList());
		
		Map<Integer, Object> productImagesResults = new HashMap<>();
	    for (Integer productCode : productCodes) {
	        Object imgResult = productService.contentImgProcess(productCode);
	        productImagesResults.put(productCode, imgResult);
	    }
		
		
		
		
		
		map.put("productList", productList);	
		map.put("productImages", productImagesResults);
		
		log.info("productList-get:{}", map.get("productList"));
		// 객체map에 put한 리스트 출력
		return ResponseEntity.ok(map);
	}
	
	
	//물품 이름으로 리스트 가져오기
//		@GetMapping("/list/{product_name}")
//		public ResponseEntity<Map<String, Object>> searchlist(@PathVariable("product_name") String product_name) {
//			Map<String, Object> map = new HashMap<>();
//			log.info("들어온 제품명:{}", product_name);
//			List<ProductDTO> productList = productService.searchlistProcess(product_name);
//			
//			List<Integer> productCodes = productList.stream()
//	                .map(ProductDTO::getProduct_code)
//	                .collect(Collectors.toList());
//			
//			
//			
//			Map<Integer, Object> productImagesResults = new HashMap<>();
//		    for (Integer productCode : productCodes) {
//		        Object imgResult = productService.contentImgProcess(productCode);
//		        productImagesResults.put(productCode, imgResult);
//		    }
//			
//			
//		    
//			
//			
//			map.put("productList", productList);	
//			map.put("productImages", productImagesResults);
//			
//			log.info("productList-get:{}", map.get("productList"));
//			// 객체map에 put한 리스트 출력
//			return ResponseEntity.ok(map);
//		}
	
	
	// 판매자 
	@GetMapping("/seller/{seller_id}")
	public ResponseEntity<Map<String, Object>> sellerlist(@PathVariable("seller_id") int seller_id) {
		Map<String, Object> map = new HashMap<>();
		log.info("들어온 제품명:{}", seller_id);
		List<ProductDTO> productList = productService.sellerlistProcess(seller_id);
		
		List<Integer> productCodes = productList.stream()
                .map(ProductDTO::getProduct_code)
                .collect(Collectors.toList());
		
		
		
		Map<Integer, Object> productImagesResults = new HashMap<>();
	    for (Integer productCode : productCodes) {
	        Object imgResult = productService.contentImgProcess(productCode);
	        productImagesResults.put(productCode, imgResult);
	    }
		

		map.put("productList", productList);	
		map.put("productImages", productImagesResults);
		
		log.info("productList-get:{}", map.get("productList"));
		// 객체map에 put한 리스트 출력
		return ResponseEntity.ok(map);
	}
	
}
