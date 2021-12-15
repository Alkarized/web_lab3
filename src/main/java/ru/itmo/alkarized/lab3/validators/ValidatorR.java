package ru.itmo.alkarized.lab3.validators;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator("validatorR")
public class ValidatorR implements Validator {
    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object o) throws ValidatorException {
        float r = Float.parseFloat(o.toString());
        if (!(1 < r && r < 4 )){
            throw new ValidatorException(new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                    "Введенное число выпадает из разрешенных значений R"));
        }
    }
}
