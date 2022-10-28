-- CreateTable
CREATE TABLE "api_usage_record" (
    "id" TEXT NOT NULL,
    "api_name" TEXT NOT NULL,
    "called_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "called_by" TEXT NOT NULL,

    CONSTRAINT "api_usage_record_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "api_usage_record" ADD CONSTRAINT "api_usage_record_called_by_fkey" FOREIGN KEY ("called_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
