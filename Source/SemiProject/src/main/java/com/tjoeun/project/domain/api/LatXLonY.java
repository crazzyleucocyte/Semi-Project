package com.tjoeun.project.domain.api;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
public class LatXLonY {
		public double la;

		public double lo;

		public double x;
		public double y;
		
		public int getX() {
			return (int)x;
		}
		
		public int getY() {
			return (int)y;
		}
		
		public double getLa() {
			return la;
		}
		
		public double getLo() {
			return lo;
		}

}


