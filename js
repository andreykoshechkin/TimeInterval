import com.vaadin.annotations.JavaScript;
import com.vaadin.server.VaadinRequest;
import com.vaadin.ui.JavaScript;
import com.vaadin.ui.TextField;
import com.vaadin.ui.UI;
import com.vaadin.ui.VerticalLayout;
import java.util.ArrayList;
import java.util.List;

@JavaScript({"vaadin://my-js.js"})
public class CustomDropdownUI extends UI {

    private TextField textField;
    private List<String> items;

    @Override
    protected void init(VaadinRequest vaadinRequest) {
        VerticalLayout layout = new VerticalLayout();
        textField = new TextField("Enter text:");
        
        items = new ArrayList<>();
        items.add("Apple");
        items.add("Banana");
        items.add("Cherry");
        items.add("Date");
        items.add("Elderberry");
        
        layout.addComponent(textField);
        layout.setMargin(true);
        layout.setSpacing(true);
        
        setContent(layout);

        // Call JavaScript function to initialize the custom dropdown
        JavaScript.getCurrent().execute("initCustomDropdown()");
        
        textField.addValueChangeListener(e -> updateDropdown());
    }

    private void updateDropdown() {
        List<String> filteredItems = new ArrayList<>();
        String input = textField.getValue().toLowerCase();
        
        for (String item : items) {
            if (item.toLowerCase().contains(input)) {
                filteredItems.add(item);
            }
        }
        
        // Pass the filtered items to JavaScript
        JavaScript.getCurrent().call("updateDropdown", filteredItems);
    }
}



Создайте файл my-js.js в директории src/main/webapp/VAADIN/:

javascript
Копировать код
window.initCustomDropdown = function() {
    let inputField = document.querySelector("input");
    let dropdown = document.createElement("div");
    dropdown.classList.add("dropdown-container");
    
    inputField.parentNode.appendChild(dropdown);
    
    inputField.addEventListener("input", function() {
        let event = new CustomEvent("input-changed", {
            detail: {
                value: inputField.value
            }
        });
        inputField.dispatchEvent(event);
    });
};


Создайте файл my-js.js в директории src/main/webapp/VAADIN/:
window.initCustomDropdown = function() {
    let inputField = document.querySelector("input");
    let dropdown = document.createElement("div");
    dropdown.classList.add("dropdown-container");
    
    inputField.parentNode.appendChild(dropdown);
    
    inputField.addEventListener("input", function() {
        let event = new CustomEvent("input-changed", {
            detail: {
                value: inputField.value
            }
        });
        inputField.dispatchEvent(event);
    });
};

window.updateDropdown = function(items) {
    let dropdown = document.querySelector(".dropdown-container");
    dropdown.innerHTML = "";
    
    items.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("dropdown-item");
        div.textContent = item;
        div.onclick = function() {
            let inputField = document.querySelector("input");
            inputField.value = item;
            dropdown.innerHTML = "";
        };
        dropdown.appendChild(div);
    });
};

style:
.dropdown-container {
    position: absolute;
    z-index: 1000;
    background: white;
    border: 1px solid #ccc;
    max-height: 150px;
    overflow-y: auto;
    width: 100%;
}

.dropdown-item {
    padding: 8px;
    cursor: pointer;
}

.dropdown-item:hover {
    background: #f0f0f0;
}

