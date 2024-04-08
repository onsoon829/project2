package com.blogfriday.cart.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.blogfriday.cart.dto.CartDTO;
@Mapper
@Repository
public interface CartRepository {
	
  
   public List<CartDTO> findAll();//장바구니 리스트 출력
   public CartDTO findByCode(int cartProductCode);
   public void insert(CartDTO cart);// 장바구니에 물건 추가
   public void update(CartDTO cart);// 장바구니 물건 수정
//   public void delete(int cartProductCode);// 장바구니 물건 삭제
  
   
}
