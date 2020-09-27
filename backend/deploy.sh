_STACK_NAME=management-courses
S3_SWAGGER=s3://management-courses-storage/openapi.yaml
aws cloudformation package \
	--template-file template.yaml \
	--output-template-file packaged.yaml \
	--s3-bucket $(cat .env | grep BucketTemplate= | cut -d '=' -f2) \
	--profile $(cat .env | grep Profile= | cut -d '=' -f2) && \
aws cloudformation deploy \
	--template-file packaged.yaml \
	--stack-name ${_STACK_NAME} \
	--capabilities CAPABILITY_NAMED_IAM \
	--profile $(cat .env | grep Profile= | cut -d '=' -f2) \
	--region $(cat .env | grep Region= | cut -d '=' -f2) \
  --parameter-overrides SwaggerS3File=${S3_SWAGGER}
