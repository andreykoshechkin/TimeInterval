BEGIN
    FOR res IN (SELECT req_data_id, req_data_clientType FROM testTable 
                WHERE requestStage IN ('П', 'G', 'S', 'A', 'X')
                AND requestExtCurrier = 'Д') LOOP
        IF res.req_data_id IN ('П', 'G') OR (res.req_data_id = 'З' AND res.req_data_clientType = 'ЮЛ') THEN
            ChangeStatus('Новая');
            ChangeStage('Открытие счета');
        ELSIF res.req_data_id IN ('S', 'A') THEN
            ChangeStatus('Старая');
            ChangeStage('Закрытие счета');
        ELSE
            DBMS_OUTPUT.PUT_LINE('Неизвестное значение req_data_id: ' || res.req_data_id);
        END IF;
    END LOOP;
    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Ошибка при изменении статуса или стадии: ' || SQLERRM);
        ROLLBACK;
END;
