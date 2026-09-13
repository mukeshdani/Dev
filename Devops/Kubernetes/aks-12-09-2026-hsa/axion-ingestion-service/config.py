"""
Axion Ingestion Service - Configuration
Loads database connection string from environment variable.
"""


import os
import urllib.parse
from dataclasses import dataclass


@dataclass
class Settings:
    # PostgreSQL connection string
    # Format: postgresql://<user>:<password>@<host>:<port>/<database>
    # Example: postgresql://postgres:postgres@localhost:5432/axiondb
    db_user = "postgres"
    db_password = urllib.parse.quote_plus("mysecretpassword")
    db_host = "postgres-service"
    db_port = "5432"
    db_name = "postgres"

    # 2. Final Connection String Definition
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
    )

settings = Settings()
