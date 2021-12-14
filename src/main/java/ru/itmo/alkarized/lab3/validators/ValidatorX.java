package ru.itmo.alkarized.lab3.validators;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator
public class ValidatorX implements Validator {
    int[] allowedX = new int[]{-5, -4, -3, -2, -1, 0, 1, 2, 3};
    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object o) throws ValidatorException {
        /*try {
            int x = Integer.parseInt(o.toString());
            if (Arrays.stream(allowedX).noneMatch(elem -> elem == x)){
                throw new ValidatorException(new FacesMessage("Не входит в разрешенные данные"));
            }
        } catch (Exception e){
            throw new ValidatorException(new FacesMessage("Введено не число"));
        }*/
    }
}
