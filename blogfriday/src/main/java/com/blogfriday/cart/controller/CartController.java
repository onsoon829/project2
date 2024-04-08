package com.blogfriday.cart.controller;

import com.blogfriday.cart.dto.CartDTO;
import com.blogfriday.cart.service.CartService;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

import java.nio.charset.Charset;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartController {

	
    private final CartService cartService;
	
	@Autowired
	public CartController(CartService cartService) {
		this.cartService = cartService;
	}

	@GetMapping("/list")//리스트 뽑아오기
	public ResponseEntity<List<CartDTO>> getAllCarts(){
		return ResponseEntity.ok(cartService.getAllCarts());
	}
	
	@GetMapping("/{cartProductCode}")
	public ResponseEntity<CartDTO>getCartById(@PathVariable("cartProductCode")int cartProductCode){
		CartDTO cart = cartService.getCartByCode(cartProductCode);
		if(cart == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(cart);
	}
	
	// 상품 추가
	@PostMapping("/add")
	public ResponseEntity<Void> addCart(@Valid @RequestBody CartDTO cart) {
		cartService.insert(cart);
		return ResponseEntity.ok().build();
	}
	
	//상품 수정
	@PutMapping("/{cartproductcode}")
	public ResponseEntity<Void>updateCart(@PathVariable ("cartProductCode")
	int cartProductCode, @RequestBody CartDTO  cart){
		cart.setCart_product_code(cartProductCode);
		cartService.update(cart);
		return ResponseEntity.ok().build();
	}
//	
//	//상품 삭제
//	@DeleteMapping("/{cartproductcode}")
//	public ResponseEntity<Void>deleteCart(@PathVariable ("cartProductCode")
//	int cartProductCode){
//		cartService.delete(cartProductCode);
//		return ResponseEntity.ok().build();
//	}

}//end class

