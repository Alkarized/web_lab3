package ru.itmo.alkarized.lab3.validators;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@FacesValidator("validatorX")
public class ValidatorX implements Validator {
    List<Integer> allowedX = Arrays.asList(-5, -4, -3, -2, -1, 0, 1, 2, 3);

    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object o) throws ValidatorException {
        int x = Integer.parseInt(o.toString());
        System.out.println(x);
        if (allowedX.stream().noneMatch(elem -> elem == x)) {
            throw new ValidatorException(new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                    "Введенное число выпадает из разрешенных значений X"));
        }
    }
}

