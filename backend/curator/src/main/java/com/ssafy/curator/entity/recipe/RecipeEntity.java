package com.ssafy.curator.entity.recipe;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "recipe")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeEntity {
    @Id
    private Long RECIPE_ID;
    private String RECIPE_NM_KO;
    private String SUMRY;
    private String NATION_CODE;
    private String NATION_NM;
    private String TY_CODE;
    private String TY_NM;
    private String COOKING_TIME;
    private String CALORIE;
    private String QNT;
    private String LEVEL_NM;
    private String IRDNT_CODE;
    private String PC_NM;
    private String IMG_URL;
    private String DET_URL;


}


