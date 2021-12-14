package ru.itmo.alkarized.lab3.validators;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator
public class ValidatorY implements Validator {
    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object o) throws ValidatorException {
        /*try {
            float y = Float.parseFloat(o.toString());
            if (!(-3 < y && y < 5 )){
                throw new OutOfBoundException();
            }
        } catch (NumberFormatException e){
            throw new ValidatorException(new FacesMessage("error1"));
        } catch (OutOfBoundException e){
            throw new ValidatorException(new FacesMessage("error2"));
        }*/
    }
}
