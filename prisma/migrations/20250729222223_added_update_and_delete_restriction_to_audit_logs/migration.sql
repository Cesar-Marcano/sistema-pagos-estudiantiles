-- Function to prevent UPDATE and DELETE
CREATE OR REPLACE FUNCTION auditlog_immutable()
RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'AuditLog records are immutable and cannot be modified or deleted';
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to prevent UPDATE
CREATE TRIGGER auditlog_no_update
BEFORE UPDATE ON "AuditLog"
FOR EACH ROW
EXECUTE FUNCTION auditlog_immutable();

-- Create trigger to prevent DELETE
CREATE TRIGGER auditlog_no_delete
BEFORE DELETE ON "AuditLog"
FOR EACH ROW
EXECUTE FUNCTION auditlog_immutable();
