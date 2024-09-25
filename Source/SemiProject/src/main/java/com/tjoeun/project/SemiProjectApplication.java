package com.tjoeun.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SemiProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(SemiProjectApplication.class, args);
	}

}
