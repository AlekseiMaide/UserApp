package com.alekseimaide.app.user.form;

import javax.validation.constraints.*;
import java.util.Date;


public class UserForm {
    @Size(min = 3, max = 32, message = "First name must be between 3 to 32 characters")
    @NotBlank(message = "First name is required.")
    private String firstName;

    @Size(min = 3, max = 32, message = "Last name must be between 3 to 32 characters")
    @NotBlank(message = "Last name is required.")
    private String lastName;

    @Size(min = 3, max = 32, message = "Email must be between 3 to 32 characters")
    @Email(message = "Wrong email format.")
    @NotBlank(message = "Email is required.")
    private String email;

    @Size(min = 3, max = 128, message = "Address must be between 3 to 128 characters")
    @NotBlank(message = "Address is required.")
    private String address;

    @PastOrPresent(message = "Date must be in the past.")
    @NotNull(message = "Date Of Birth is required.")
    private Date dob;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }
}
