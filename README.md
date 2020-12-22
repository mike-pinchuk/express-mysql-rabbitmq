CREATE DEFINER=`root`@`localhost` PROCEDURE `storage_db`(
IN _id INT,
IN _login VARCHAR(45),
IN _pass VARCHAR(45)
)
BEGIN
IF _id = 0 THEN
INSERT INTO rabbit_db(login, pass)
VALUES (_login,_pass);
SET _id = last_insert_id();
ELSE
UPDATE rabbit_db
SET
login = _login,
pass = _pass
WHERE id = _id;
END IF;
SELECT _id AS 'id';
END


<!-- For this -->
CREATE DEFINER=`root`@`localhost` PROCEDURE `storage_db`(
IN _login VARCHAR(45),
IN _pass VARCHAR(45)
)
BEGIN
INSERT INTO rabbit_db(login, pass)
VALUES (_login, _pass);

END