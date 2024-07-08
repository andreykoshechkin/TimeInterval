package com.example.timeinterval;

import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.checkbox.CheckboxGroup;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;
import java.util.Set;

@Route("/time")
public class View extends VerticalLayout {

    public View() {

        ComboBox<String> timeIntervalCheckBoxGroup = new ComboBox<>();

        // Добавление элементов в CheckBoxGroup
        timeIntervalCheckBoxGroup.setItems("10:00-15:00", "15:00-20:00");

        // Установка стиля (необязательно)
       // timeIntervalCheckBoxGroup.addStyleName(ValoTheme.OPTIONGROUP_HORIZONTAL);

        // Добавление слушателя изменения значения
        timeIntervalCheckBoxGroup.addValueChangeListener(event -> {
            Set<String> selectedItems = Collections.singleton(event.getValue());
            selectedItems.forEach(item -> {
                // Преобразование строки в LocalDate (примерно, поскольку тут не указана конкретная дата)
                LocalTime time = convertStringToLocalDate(item);

                // Демонстрация результата с использованием Notification
                Notification.show("Выбранный интервал: " + item + ", Дата: " + time.toString());
            });
        });

        // Добавление CheckBoxGroup на layout
        add(timeIntervalCheckBoxGroup);
    }


    private LocalTime convertStringToLocalDate(String timeInterval) {
        // Пример преобразования строки в LocalDate
        // Поскольку в вашем примере отсутствует конкретная дата, будем использовать текущую дату для демонстрации
        LocalTime today = LocalTime.now();

        // Разделение строки на части (начальное и конечное время)
        String[] parts = timeInterval.split("-");

        // Для более сложного преобразования необходимо учитывать дополнительные параметры,
        // например, начальное и конечное время, но в данном случае это простой пример.
        return today;
    }
}
