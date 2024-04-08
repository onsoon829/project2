package com.blogfriday.cart.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.blogfriday.cart.dto.CartDTO;
import com.blogfriday.cart.repository.CartRepository;
import org.springframework.transaction.annotation.Transactional;

@Service//서비스 쪽이라는 걸 명시적으로 표시
public class CartServiceImpl implements CartService {
	
	//repository - serviceimp / 의존성
	
	private final CartRepository cartRepository;
	
	@Autowired
	public CartServiceImpl(CartRepository cartRepository) {
		this.cartRepository = cartRepository;
	}
	
	@Override
	@Transactional
	public List<CartDTO> getAllCarts(){
		return cartRepository.findAll();
	}
	
	@Override
	@Transactional
	public CartDTO getCartByCode(int cartProductCode) {
		return cartRepository.findByCode(cartProductCode);
	}
	
	@Override
	@Transactional
	public void insert(CartDTO cart) {
		cartRepository.insert(cart);
	}
	
	@Override
	@Transactional
	public void update(CartDTO cart) {
		cartRepository.update(cart);
	}
	
	@Override
	@Transactional
	public void delete(int cartProductCode) {
		cartRepository.delete(cartProductCode);
	}


}//end class
