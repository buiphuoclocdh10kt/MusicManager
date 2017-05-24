create schema db_musicsong;
use db_musicsong;
create table song_table(
id_song int auto_increment,
name_song varchar(100),
author_song varchar(100),
date_add_song datetime,
public_song boolean default 0,
primary key(id_song)
);
insert into song_table(name_song,author_song,date_add_song) values ("Diễm Xưa","Trịnh Công Sơn","2017-12-13");
insert into song_table(name_song,author_song,date_add_song) values ("Cát Bụi","Trịnh Công Sơn","2017-05-22");
insert into song_table(name_song,author_song,date_add_song) values ("Về Đâu Mái Tóc Người Thương","Hoài Linh","2017-05-22");
insert into song_table(name_song,author_song,date_add_song) values ("Xót Xa","Phan Thanh Tùng","2017-05-22");
insert into song_table(name_song,author_song,date_add_song) values ("Lưu Bút Ngày Xanh","Thanh Sơn","2017-05-22");
select * from song_table;