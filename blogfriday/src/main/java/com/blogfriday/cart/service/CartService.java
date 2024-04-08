package com.blogfriday.cart.service;

import java.util.List;
import com.blogfriday.cart.dto.CartDTO;
//import org.apache.ibatis.annotations.Mapper;
public interface CartService {
   
   public List<CartDTO> getAllCarts();
   public CartDTO getCartByCode(int cartProductCode);
   public void insert(CartDTO cart);
   public void update(CartDTO cart);
   public void delete(int cartProductCode);

}//end class
