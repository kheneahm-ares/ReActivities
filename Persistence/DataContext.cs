﻿using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        //entities aka tables
        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }

        //seeding
        protected override void OnModelCreating(ModelBuilder builder)
        {
            //allows to give app user with primary key
            base.OnModelCreating(builder);

            builder.Entity<Value>()
                .HasData(
                    new Value { Id = 1, Name = "Value101"},
                    new Value { Id = 2, Name = "Value102"},
                    new Value { Id = 3, Name = "Value103"}
                );
        }

    }
}
